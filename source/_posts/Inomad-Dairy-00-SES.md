---
title: Inomad-Dairy-00-SES
date: 2023-11-10 23:15:57
tags: [Inomad, AWS, SES]
excerpt: After almost a week waiting for the SES service to be approved, Inomad finally got the approval email from AWS...
---

## 🥳🎊

I have been thinking to start a series about the e-commerce platform [Inomad](https://github.com/Dogecat0/inomad-demo) for quite a while now. However, I was not sure about the content of the series and how to structure it. The thinking is till going on but I've decided to start it anyway. So, here we go, let's begin with a small celebration today.

After almost a week waiting for the SES service to be approved, Inomad finally got the approval email from AWS. Thanks to the [django-ses](https://github.com/django-ses/django-ses) package, I was able to set up the email service quite easily with just set `EMAIL_BACKEND = django_ses.SESBackend` in the `settings.py `file.

TBC...