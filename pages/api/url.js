const DM = require("../../dmod/index.js");


export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.url) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'N/A' })
    }

	var id = await DM.functions.shortenURL(body.url);

    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `${id}` })
}
