using Sitecore.ContentSearch;
using Sitecore.ContentSearch.ComputedFields;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;

namespace JssSimpleBlog.Indexing.ComputedFields
{
    public class Year : AbstractComputedIndexField
    {
        public override object ComputeFieldValue(IIndexable indexable)
        {
            Item item = indexable as SitecoreIndexableItem;
            if (item == null)
            {
                return null;
            }

            var dateTimeField = (DateField)item.Fields["{F30D1551-0A54-4201-BB0D-BC7D73398792}"];
            var dateTime = dateTimeField?.DateTime ?? item.Created;
            return dateTime.ToLocalTime().ToString("yyyy");
        }
    }
}