using Sitecore.ContentSearch;
using Sitecore.ContentSearch.ComputedFields;
using Sitecore.Data.Items;
using System;
using System.Linq;

namespace JssSimpleBlog.Indexing.ComputedFields
{
    public class Tags : AbstractComputedIndexField
    {
        public override object ComputeFieldValue(IIndexable indexable)
        {
            Item item = indexable as SitecoreIndexableItem;
            if (item == null) {
                return null;
            }

            var tags = item["{E9D5DDA2-8C40-4448-91E0-198721FA5652}"];
            return tags.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).ToList();
        }
    }
}