# being-rewards-chrome-plugin

This Chrome extension runs Bing searches in the background so you can gain Bing Rewards points.

NOTE: To successfully gain Bing points, you must already be logged into Bing so the plugin can leverage the session.
There are no login/credential inputs for this extension.

# Settings

The extension has two options which dictate when the Bing searches are performed and what search terms are used for
the search. These options can be enabled together, see the extension's popup after the extension is installed to
select which options to enable/disable.

1 - By Tabs (disabled by default)
When are the Bing searches performed: Every time a new tab is opened.
Where are the search terms from: The Google /trends/hottrends API. A trend from 1 or 4 days ago is randomly selected
and used as the search term. This means some Bing searches will be duplicates and not result in any reward point.

2 - By Google Search (enabled by default)
When are the Bing searches performed: Everytime a Google search is performed
Where are the search terms from: Your Google searches

There is also an option to disable the extension.
