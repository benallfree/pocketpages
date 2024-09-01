# Speedrun: Connecting Your Fly.io App to a Custom Domain with Cloudflare Proxy

Custom domains on your Fly.io app with Cloudflare in front can be a little complex because you must validate the domain on Fly.io BEFORE turning on Cloudflare proxying. Follow these steps.

## 1. Create the Fly.io App

- Start by deploying your app on [Fly.io](https://fly.io/). Follow the standard process to get your app up and running.

## 2. Register Your Domain

- If you haven't already, register your domain. It's often convenient to register it through [Cloudflare](https://cloudflare.com), which will also handle your DNS and proxying needs.

## 3. Configure DNS in Cloudflare

- In Cloudflare's DNS settings, add **A** and **AAAA** records pointing to your Fly.io app's public IPv4 and IPv6 addresses.
- **Important:** Turn off proxying (the orange cloud icon) for these records. This ensures that the Fly.io app can be accessed directly.

## 4. Add a Certificate in Fly.io

- In your Fly.io dashboard, add an SSL certificate for your custom domain.
- Since proxying is turned off, Fly.io should be able to validate the certificate immediately. Your app should now respond on your custom domain, but it's not yet proxied through Cloudflare.

## 5. Verify Domain Ownership and Proxying

- From the Fly.io certificate area, add the **CNAME** record required for domain ownership verification.
- **Important:** Turn off proxying for the CNAME record as well. Fly.io needs to verify ownership whenever the SSL certificate is renewed, which requires direct access.
- Go back to Fly.io, check the certificate, and ensure domain ownership verification is successful.

## 6. Turn On Proxying in Cloudflare

- Once everything is verified and working, return to Cloudflare and turn on proxying (enable the orange cloud) for your A and AAAA records.
- In Cloudflare’s **SSL/TLS** settings, set the encryption mode to **Full** (not Full Strict) to ensure proper SSL handshakes between Cloudflare and Fly.io.

## 7. Test Your Setup

- Finally, browse to your new domain to confirm everything is working as expected with Cloudflare proxying enabled.

You now have a fully functioning Fly.io app served through a custom domain with Cloudflare as the proxy!
