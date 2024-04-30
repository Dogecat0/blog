---
title: Inomad-Dairy-02-Complex-ProductModel
date: 2024-04-29 00:09:44
tags: [Inomad, Django, ProductModel]
---

## 🔎 Intro

In this blog post, I'll walk through how to model complex relationships between products using Django, specifically focusing on a scenario where products can be composed of other products, and vice versa.

<!-- more -->

This is a common requirement in industries like manufacturing, where products are often made up of various parts, each potentially being a product in itself.

## Modeling the Product Relationships

We start by defining our Product model, which needs to handle relationships where a product can have components and also be a component of other products. Here's how we can efficiently structure this in Django:

```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)

class ProductComponent(models.Model):
    parent = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='components')
    part = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='part_of')
    quantity = models.IntegerField()
```

In this setup, ProductComponent acts as a linking model between Product instances, defining a many-to-many relationship from a product to its components through the foreign keys to Product.

## Admin Interface Setup

To manage these relationships effectively in Django's admin interface, we set up the models to include inlines, allowing administrators to edit product components directly within product entries:

```python
from django.contrib import admin
from .models import Product, ProductComponent

class ProductComponentInline(admin.TabularInline):
    model = ProductComponent
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [ProductComponentInline]

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductComponent)
```

This configuration makes it straightforward to manage the complex hierarchies of products and their parts.

## Form Handling

Handling forms for such a relationship involves using Django's formsets to manage multiple product components within a single form interface. Here's how you set up the forms:

```python
from django import forms
from django.forms import inlineformset_factory
from .models import Product, ProductComponent

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name']

ProductComponentFormSet = inlineformset_factory(
    parent=Product,
    model=ProductComponent,
    fields=['part', 'quantity'],
    extra=1,
    can_delete=True
)
```

And integrating this into a view:

```python
from django.shortcuts import render, redirect

def manage_product(request, product_id=None):
    if product_id:
        product = Product.objects.get(pk=product_id)
        form = ProductForm(instance=product)
        formset = ProductComponentFormSet(instance=product)
    else:
        form = ProductForm()
        formset = ProductComponentFormSet()

    if request.method == 'POST':
        form = ProductForm(request.POST, instance=product if product_id else None)
        formset = ProductComponentFormSet(request.POST, instance=product if product_id else None)

        if form.is_valid() and formset.is_valid():
            created_product = form.save()
            formset.instance = created_product
            formset.save()
            return redirect('product_list')

    return render(request, 'product/manage_product.html', {'form': form, 'formset': formset})
```

## Summary

This product model setup allows for a flexible and scalable way to manage complex product relationships in Django, making it easier to handle intricate product hierarchies and compositions for products like those in the manufacturing industry that require parent/component relationships.