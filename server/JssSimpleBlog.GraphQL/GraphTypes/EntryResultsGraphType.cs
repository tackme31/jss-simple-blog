using GraphQL.Types;
using JssSimpleBlog.GraphQL.GraphTypes.ContentSearch;
using Sitecore.Services.GraphQL.Content.GraphTypes;

namespace JssSimpleBlog.GraphQL.GraphTypes
{
    public class EntryResultsGraphType : ObjectGraphType<EntrySearchResults>
    {
        public EntryResultsGraphType()
        {
            Name = "EntryResults";

            Field<ListGraphType<ItemInterfaceGraphType>>("entries", resolve: context => context.Source.Entries);
            Field<ListGraphType<EntryFacetCategoryGraphType>>("facets", resolve: context => context.Source.Facets);
            Field<IntGraphType>("totalCount", resolve: context => context.Source.TotalCount);
        }
    }
}