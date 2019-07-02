// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
	manifest.addTemplate({
		name: "AuthorFolder",
        displayName: "Author Folder",
        icon: SitecoreIcon.Folder,
        fields: [],
        insertOptions: ['Author']
	});
}
