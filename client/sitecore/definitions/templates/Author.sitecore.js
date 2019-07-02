// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
	manifest.addTemplate({
		name: "Author",
        displayName: "Author",
        icon: SitecoreIcon.Person,
        fields: [
            {
                id: "{D249B122-0A26-4BDA-B760-36A8DC9C4C1B}",
                name: "fullname",
                displayName: "Full Name",
                type: CommonFieldTypes.SingleLineText,
                standardValue: "$name",
                required: true,
            },
            {
                id: "{7CA82480-9482-4045-9DD0-03C310521CA8}",
                name: "profile",
                displayName: "Profile",
                type: CommonFieldTypes.MultiLineText,
            }
        ],
	});
}
