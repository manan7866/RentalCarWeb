import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { client } from '@/sanity/lib/client';

// Disable the default body parsing for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};

// API route handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    // Parse the incoming request (form data)
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ error: 'Something went wrong' });
      }

      // Type assertion for file
      const file = (files.file as formidable.File[])[0]; // Files are in an array, so access the first element

      // Check if file exists
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
        // Upload the file to Sanity as an image
        const uploadedAsset = await client.assets.upload('image', fs.createReadStream(file.filepath), {
          filename: file.originalFilename || '', // Ensure the filename is a non-null string
        });

        if (!uploadedAsset || !uploadedAsset.url) {
          return res.status(500).json({ error: 'Image upload failed, URL not returned from Sanity' });
        }

        // Return the image URL if successful
        res.status(200).json({ url: uploadedAsset.url || '' });
      } catch (error) {
        console.error('Sanity upload error:', error);
        res.status(500).json({ error: 'Failed to upload image to Sanity' });
      }
    });
  } else {
    // Method Not Allowed if the request isn't POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;



