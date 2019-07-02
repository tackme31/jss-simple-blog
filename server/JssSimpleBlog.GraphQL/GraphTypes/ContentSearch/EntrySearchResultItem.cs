using Sitecore.ContentSearch;
using Sitecore.ContentSearch.SearchTypes;
using System;
using System.Collections.Generic;

namespace JssSimpleBlog.GraphQL.GraphTypes.ContentSearch
{
    public class EntrySearchResultItem : SearchResultItem
    {
        [IndexField("title")]
        public string Title { get; set; }

        [IndexField("introduction")]
        public string Introduction { get; set; }

        [IndexField("body")]
        public string Body { get; set; }

        [IndexField("datetime")]
        public DateTime DateTime { get; set; }

        [IndexField("tags")]
        public List<string> Tags { get; set; }

        [IndexField("year")]
        public string YearFacet { get; set; }

        [IndexField("month")]
        public string MonthFacet { get; set; }
    }
}