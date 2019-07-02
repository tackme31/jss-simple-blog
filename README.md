# JSS Simple Blog
Simple blog implementation build with JSS.

## Prerequisites
- Sitecore XP (or XM) 9.1 Update-1
- Sitecore JavaScript Service 11.1.0

## How to deploy
1. [Setup your sitecore instance for JSS](https://jss.sitecore.com/docs/getting-started/jss-server-install).
1. Fix `/server/JssSimpleBlog.Indexing/App_Config/Include/JssSimpleBlog/z.JssSimpleBlog.ContentSearch.CoreNames.config` for your Solr's core.
1. Deploy the projects under `/server`.
1. [Deploy the JSS project](https://jss.sitecore.com/docs/getting-started/app-deployment) under `/client`.
1. Populate solr schema for `sitecore_master_blog_index` and `sitecore_web_blog_index`.
1. Rebuild the indexes.