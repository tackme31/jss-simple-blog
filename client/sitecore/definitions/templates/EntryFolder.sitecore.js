// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
	manifest.addTemplate({
		name: "EntryFolder",
        displayName: "Entry Folder",
        icon: SitecoreIcon.FolderDocument2,
        fields: [],
        insertOptions: ['EntryPage']
	});
}
