using GraphQL.Types;
using JssSimpleBlog.GraphQL.GraphTypes;
using JssSimpleBlog.GraphQL.GraphTypes.ContentSearch;
using Sitecore;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.Linq;
using Sitecore.Services.GraphQL.Schemas;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JssSimpleBlog.GraphQL.Queries
{
    public class EntriesQuery : RootFieldType<EntryResultsGraphType, EntrySearchResults>
    {
        public EntriesQuery() : base(name: "entries", description: "Searches entryes with ContentSearch API")
        {
            Arguments = new QueryArguments(Array.Empty<QueryArgument>())
                {
                    new QueryArgument<IntGraphType>
                    {
                        Name = "offset",
                    },
                    new QueryArgument<IntGraphType>
                    {
                        Name = "limit",
                    },
                    new QueryArgument<ListGraphType<StringGraphType>>
                    {
                        Name = "tags",
                    },
                    new QueryArgument<ListGraphType<StringGraphType>>
                    {
                        Name = "keywords",
                    },
                    new QueryArgument<StringGraphType>
                    {
                        Name = "archivesOn",
                    },
                    new QueryArgument<ListGraphType<StringGraphType>>
                    {
                        Name = "facetOn",
                    },
                };
        }

        protected override EntrySearchResults Resolve(ResolveFieldContext context)
        {
            var index = ContentSearchManager.GetIndex($"sitecore_{Context.Database.Name.ToLowerInvariant()}_blog_index");
            using (var searchContext = index.CreateSearchContext())
            {
                var queryable = searchContext
                    .GetQueryable<EntrySearchResultItem>()
                    .Filter(item => item.Paths.Contains(ItemIDs.ContentRoot));

                var keywords = context.GetArgument<List<string>>("keywords");
                if (keywords != null)
                {
                    foreach (var keyword in keywords)
                    {
                        queryable = queryable.Filter(item 
                            => item.Title.Contains(keyword)
                            || item.Introduction.Contains(keyword)
                            || item.Body.Contains(keyword));
                    }
                }

                var tags = context.GetArgument<List<string>>("tags");
                if (tags != null)
                {
                    foreach (var tag in tags)
                    {
                        queryable = queryable.Filter(item => item.Tags.Contains(tag));
                    }
                }

                var archivesOn = context.GetArgument<string>("archivesOn");
                if (!string.IsNullOrEmpty(archivesOn))
                {
                    queryable = archivesOn.Length == 4
                        ? queryable.Filter(item => item.YearFacet == archivesOn)
                        : queryable.Filter(item => item.MonthFacet == archivesOn);
                }

                var offset = context.GetArgument<int?>("offset");
                if (offset.HasValue)
                {
                    queryable = queryable.Skip(offset.Value);
                }

                var limit = context.GetArgument<int?>("limit");
                if (limit.HasValue)
                {
                    queryable = queryable.Take(limit.Value);
                }

                var facetOn = context.GetArgument<List<string>>("facetOn");
                if (facetOn != null)
                {
                    foreach (var facet in facetOn)
                    {
                        queryable = queryable.FacetOn(item => item[facet]);
                    }
                }

                var results = queryable
                    .OrderByDescending(item => item.DateTime)
                    .GetResults();
                return new EntrySearchResults(results);
            }
        }
    }
}