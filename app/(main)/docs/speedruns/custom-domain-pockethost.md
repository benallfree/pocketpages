# Speedrun: Setting Up a Custom Domain on Pockethost

Custom domains are a **Pro feature** on Pockethost, which also unlocks unlimited projects and domains—a great deal if you plan to manage multiple projects.

## 1. Add the Custom Domain in Pockethost

- Go to your Pockethost instance dashboard.
- In the settings, add your custom domain. If you haven't upgraded yet, switch to the Pro plan to enable this feature.

## 2. Configure DNS with Your Provider

- Add a **CNAME** record pointing to your Pockethost instance using your DNS provider.
- **Recommendation:** Use [Cloudflare](https://cloudflare.com) to manage your DNS, as it supports **CNAME flattening**. This allows you to CNAME directly to your root domain, avoiding the need to use `www`.

## 3. Verify Domain Ownership

- After adding the CNAME, follow the instructions to contact **@noaxis** on Discord. He'll provide the **TXT record** needed for Cloudflare to verify your domain ownership.

## 4. Test Your Setup

- Once everything is set up, test your configuration by browsing to your custom domain to ensure everything is working as expected.

By following these steps, you can easily set up a custom domain for your Pockethost projects and take advantage of the Pro plan's features.
