import { BlobServiceClient } from "@azure/storage-blob";

const getBlobClient = () => {
  const blobServiceClient = new BlobServiceClient(
    `https://${process.env.NEXT_PUBLIC_STORAGERESOURCENAME}.blob.core.windows.net/?${process.env.NEXT_PUBLIC_STORAGESASTOKEN}`
  );
  const containerClient = blobServiceClient.getContainerClient("standards");

  return containerClient;
};

const uploadFile = async (blobName, content, metadata, tags) => {
  const containerClient = getBlobClient();

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const options = {
    blobHTTPHeaders: {
      blobContentType: content.type,
    },
    metadata: metadata,
    tags: tags,
  };

  const uploadBlobResponse = await blockBlobClient.uploadBrowserData(
    content,
    options
  );
  return uploadBlobResponse;
};

const listBlobs = async () => {
  const containerClient = getBlobClient();

  let blobs = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    blobs.push(blob);
  }

  return blobs;
};

export { uploadFile, listBlobs };
