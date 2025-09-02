function redirect(requestDetails) {
  try {
    const url = new URL(requestDetails.url);
    const murl = url.searchParams.get('murl');

    if (murl) {
      // The murl parameter is expected to be a URL-encoded string.
      const decodedUrl = decodeURIComponent(murl);

      // Check if the decoded URL is a Udemy course link.
      // This is a safety check to ensure we only redirect to Udemy.
      if (decodedUrl.startsWith('https://www.udemy.com/course/')) {
        console.log(`Linksynergy Redirector: Found Udemy link. Redirecting to: ${decodedUrl}`);
        return {
          redirectUrl: decodedUrl
        };
      }
    }
  } catch (e) {
    console.error(`Linksynergy Redirector: Error processing request ${requestDetails.url}`, e);
  }

  // If no 'murl' is found, or it's not a Udemy link,
  // let the request proceed as normal.
  return {};
}

// Add a listener for web requests to linksynergy.com domains.
browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {
    urls: ["*://*.linksynergy.com/*"],
    types: ["main_frame"] // Only apply to top-level navigation
  },
  ["blocking"] // This option is required to modify the request.
);
