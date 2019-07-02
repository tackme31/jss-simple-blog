// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the ContentBlock component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addRouteType({
    id: "{153D389F-B845-4463-BB03-45E52D2B2D1B}",
    name: "EntryPage",
    displayName: "Entry Page",
    icon: SitecoreIcon.DocumentPage_number,
    fields: [
      {
        id: "{67568061-C169-4AC1-A79B-815931B8B788}",
        name: "title",
        displayName: "Title",
        type: CommonFieldTypes.SingleLineText,
        standardValue: "$name",
        required: true,
      },
      {
        id: "{C3CDEBA3-D7CC-4344-BD78-64D27ABDAFCF}",  
        name: "introduction",
        displayName: "Introduction",
        type: CommonFieldTypes.MultiLineText,
      },
      {
        id: "{C803748B-8CDC-49AC-B90B-EC8ADD103CA2}",  
        name: "body",
        displayName: "Body",
        type: CommonFieldTypes.MultiLineText,
      },
      {
        id: "{F30D1551-0A54-4201-BB0D-BC7D73398792}",  
        name: "datetime",
        displayName: "DateTime",
        type: CommonFieldTypes.DateTime,
        standardValue: '$now',
        required: true,
      },
      {
        id: "{E9D5DDA2-8C40-4448-91E0-198721FA5652}",  
        name: "tags",
        displayName: "Tags",
        type: CommonFieldTypes.SingleLineText,
      },
      {
        id: "{EFAF44AF-8297-46E4-B66C-82BE1B96D985}",  
        name: "author",
        displayName: "Author",
        type: CommonFieldTypes.ItemLink,
        source: "{450A0B0A-B8F8-42D6-9C84-7959171BAA73}",
        required: true,
      },
    ]
  });
}
