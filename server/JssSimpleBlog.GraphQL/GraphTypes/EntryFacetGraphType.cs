using GraphQL.Types;
using Sitecore.ContentSearch.Linq;

namespace JssSimpleBlog.GraphQL.GraphTypes
{
    public class EntryFacetCategoryGraphType : ObjectGraphType<FacetCategory>
    {
        public EntryFacetCategoryGraphType()
        {
            Name = "EntryFacetCategory";

            Field<StringGraphType>("name", resolve: context => context.Source.Name);
            Field<ListGraphType<EntryFacetValueGraphType>>("values", resolve: context => context.Source.Values);
        }
    }

    public class EntryFacetValueGraphType : ObjectGraphType<FacetValue>
    {
        public EntryFacetValueGraphType()
        {
            Name = "EntryFacetValue";

            Field<StringGraphType>("name", resolve: context => context.Source.Name);
            Field<IntGraphType>("count", resolve: context => context.Source.AggregateCount);
        }
    }
}