---
title: GitHub Deploy Action for PocketHost
description: Automated deployment workflow using GitHub Actions and FTP Deploy Action to sync PocketBase projects with PocketHost.io instances via FTPS credentials and repository secrets.
---

# GitHub Deploy Action for PocketHost

This guide explains how to set up automatic deployments of your PocketBase project to PocketHost.io using GitHub Actions.

## Overview

The GitHub Action workflow provided below will automatically deploy your project to PocketHost whenever you push to the main branch or manually trigger the workflow. It uses FTP Deploy Action to sync your files with your PocketHost instance.

## Prerequisites

1. A GitHub repository containing your PocketBase project
2. A PocketHost.io account with an active instance
3. Your PocketHost FTP credentials (found in your instance settings)

## Getting PocketHost FTP Credentials

1. Log in to [PocketHost.io](https://pockethost.io)
2. Select your instance
3. Go to the "Settings" tab
4. Look for the FTP credentials section which contains:
   - FTP Host (hostname)
   - FTP Port
   - FTP Username
   - FTP Password

## Setting Up GitHub Secrets

1. Go to your repository's Settings > Secrets and Variables > Actions
2. Add the following secrets using your PocketHost FTP credentials:
   - `FTP_SERVER`: Your PocketHost FTP hostname
   - `FTP_PORT`: Your PocketHost FTP port
   - `FTP_USERNAME`: Your PocketHost FTP username
   - `FTP_PASSWORD`: Your PocketHost FTP password

## Workflow Configuration

Create a new file `.github/workflows/deploy.yml` in your repository with the following content:

```yaml
on:
  workflow_dispatch:
  push:
    branches:
      - main
name: Deploy to PocketHost
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Get latest code
        uses: actions/checkout@v4

      - name: Sync files
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          security: strict
          protocol: ftps
          server: ${{ secrets.ftp_server }}
          port: ${{ secrets.ftp_port }}
          username: ${{ secrets.ftp_username }}
          password: ${{ secrets.ftp_password }}
          local-dir: ./pb_hooks/pages/ # Adjust this to match your project structure
          server-dir: ./ # PocketHost expects files in the root directory
          log-level: verbose
          state-name: .ftp-deploy-sync-state.json
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            .gitignore
            LICENSE
            README.md
```

## Important Notes for PocketHost Deployment

- The `server-dir` should be set to `./` as PocketHost expects files in the root directory
- PocketHost uses FTPS by default, so keep `security: strict` and `protocol: ftps`
- Adjust `local-dir` based on your project structure. Common patterns:
  - `./` for entire project
  - `./pb_hooks/` for just hooks
  - `./pb_migrations/` for just migrations

## Usage

The deployment will automatically run when:

1. You push changes to the main branch
2. You manually trigger the workflow from the Actions tab in your GitHub repository

## Troubleshooting PocketHost Deployments

If you encounter issues:

1. Verify your PocketHost instance is running
2. Double-check the FTP credentials in your PocketHost dashboard
3. Ensure you're using FTPS (not regular FTP)
4. Check if your files are being uploaded to the correct directory
5. Review the Actions logs in GitHub for detailed error messages

## Security Considerations

- Never commit FTP credentials directly in the workflow file
- Regularly rotate your PocketHost FTP credentials
- Consider deploying only from protected branches
- Review deployed files in PocketHost dashboard to ensure successful deployment

## Additional Resources

- [PocketHost Documentation](https://docs.pockethost.io)
- [FTP Deploy Action Documentation](https://github.com/SamKirkland/FTP-Deploy-Action)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
