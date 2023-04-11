import { BlobServiceClient } from "@azure/storage-blob";

const getBlobClient = () => {
  const blobServiceClient = new BlobServiceClient(
    `https://${process.env.NEXT_PUBLIC_STORAGERESOURCENAME}.blob.core.windows.net/${process.env.NEXT_PUBLIC_STORAGESASTOKEN}`
  );
  const containerClient = blobServiceClient.getContainerClient("standards");

  return containerClient;
};

const uploadFile = async (blobName, content) => {
  try {
    const containerClient = getBlobClient();

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const options = {
      blobHTTPHeaders: {
        blobContentType: content.type,
      },
    };

    const uploadBlobResponse = await blockBlobClient.uploadData(
      content,
      options
    );
    return uploadBlobResponse;
  } catch (e) {
    return e;
  }
};

const deleteFile = async (blobUrl) => {
  try {
    const blobName = parseUrlToBlobName(blobUrl);
    const containerClient = getBlobClient();

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const deleteBlobResponse = await blockBlobClient.deleteIfExists();

    return deleteBlobResponse;
  } catch (e) {
    return e;
  }
};

const listBlobs = async () => {
  const containerClient = getBlobClient();

  let blobs = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    blobs.push(blob);
  }

  return blobs;
};

const parseUrlToBlobName = (blobUrl) => {
  return blobUrl.substring(
    blobUrl.indexOf("standards") + 10,
    blobUrl.indexOf("?")
  );
};

function isValidBlobUrl(url) {
  try {
    var urlObject = new URL(url);
    var isAzure = urlObject.host.endsWith(".blob.core.windows.net");
    // urlObject.protocol === "blob:" &&
    return isAzure;
  } catch (e) {
    return false;
  }
}

export { getBlobClient, uploadFile, deleteFile, listBlobs, isValidBlobUrl };
