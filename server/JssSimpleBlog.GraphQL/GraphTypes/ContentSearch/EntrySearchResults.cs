using Sitecore.ContentSearch.Linq;
using Sitecore.Data.Items;
using System.Collections.Generic;
using System.Linq;

namespace JssSimpleBlog.GraphQL.GraphTypes.ContentSearch
{
    public class EntrySearchResults
    {
        public IList<Item> Entries { get; set; }
        public IList<FacetCategory> Facets { get; set; }
        public int TotalCount { get; set; }

        public EntrySearchResults(SearchResults<EntrySearchResultItem> results)
        {
            Entries = results.Hits.Select(hit => hit.Document.GetItem()).ToList();
            Facets = results.Facets.Categories;
            TotalCount = results.TotalSearchResults;
        }
    }
}