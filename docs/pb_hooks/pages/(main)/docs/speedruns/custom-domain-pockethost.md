---
title: 'Speedrun: Setting Up a Custom Domain on PocketHost'
description: "Configure DNS CNAME records, verify domain ownership via TXT records, and enable custom domains on PocketHost Pro. Uses Cloudflare's CNAME flattening for root domain support without www prefix."
---

# Speedrun: Setting Up a Custom Domain on PocketHost

Custom domains are a **Pro feature** on PocketHost, which also unlocks unlimited projects and domains—a great deal if you plan to manage multiple projects.

## 1. Add the Custom Domain in PocketHost

- Go to your PocketHost instance dashboard.
- In the settings, add your custom domain. If you haven't upgraded yet, switch to the Pro plan to enable this feature.

## 2. Configure DNS with Your Provider

- Add a **CNAME** record pointing to your PocketHost instance using your DNS provider.
- **Recommendation:** Use [Cloudflare](https://cloudflare.com) to manage your DNS, as it supports **CNAME flattening**. This allows you to CNAME directly to your root domain, avoiding the need to use `www`.

## 3. Verify Domain Ownership

- After adding the CNAME, follow the instructions to contact **@noaxis** on Discord. He'll provide the **TXT record** needed for Cloudflare to verify your domain ownership.

## 4. Test Your Setup

- Once everything is set up, test your configuration by browsing to your custom domain to ensure everything is working as expected.

By following these steps, you can easily set up a custom domain for your PocketHost projects and take advantage of the Pro plan's features.
