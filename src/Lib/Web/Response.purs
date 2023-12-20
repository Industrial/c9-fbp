module Lib.Web.Response where

import Control.Promise (Promise)
import Data.Argonaut (Json)
import Data.ArrayBuffer.Types (ArrayBuffer, Uint8Array)
import Data.Maybe (Maybe, maybe)
import Effect (Effect)
import Foreign.Object as Object
import Lib.Headers (Headers)
import Web.Streams.ReadableStream (ReadableStream)

foreign import data Response :: Type

type StatusCode = Int
type StatusText = String

foreign import _create
  :: String
  -> (Object.Object String)
  -> StatusCode
  -> StatusText
  -> Response

create
  :: String
  -> Maybe Headers
  -> Maybe StatusCode
  -> Maybe StatusText
  -> Response
create body headers statusCode statusText = do
  _create
    body
    (maybe Object.empty (\v -> (Object.fromFoldableWithIndex v)) headers)
    (maybe 200 (\v -> v) statusCode)
    (maybe "OK" (\v -> v) statusText)

foreign import getBody :: Response -> Effect (ReadableStream Uint8Array)

foreign import getBodyUsed :: Response -> Effect Boolean

foreign import getHeaders :: Response -> Effect Headers

foreign import getOK :: Response -> Effect Boolean

foreign import getRedirected :: Response -> Effect Boolean

foreign import getStatus :: Response -> Effect Int

foreign import getStatusText :: Response -> Effect String

foreign import getType :: Response -> Effect String

foreign import getURL :: Response -> Effect String

-- Methods
foreign import getArrayBuffer :: Response -> Effect (Promise ArrayBuffer)

-- TODO: Implement Blob type
-- foreign import getBlob :: Response -> Effect (Promise Blob)

foreign import getClone :: Response -> Effect (Promise Response)

-- TODO: Implement FormData type
-- foreign import getFormData :: Response -> Effect (Promise FormData)

foreign import getJSON :: Response -> Effect (Promise Json)

foreign import getText :: Response -> Effect (Promise String)

data ResponseType
  = Basic
  | Cors
  | Default
  | Error
  | Opaque

foreign import _create
  :: String
  -> Nullable (Record String)
  -> Nullable Int
  -> Nullable String
  -> Effect Response

foreign import getBodyImpl :: Response -> Nullable (ReadableStream (ArrayBuffer))
foreign import getBodyUsed :: Response -> Boolean
foreign import getHeaders :: Response -> Headers
foreign import getOK :: Response -> Boolean
foreign import getRedirected :: Response -> Boolean
foreign import getStatus :: Response -> Int
foreign import getStatusText :: Response -> String
foreign import getType :: Response -> ResponseType
foreign import getURL :: Response -> String

foreign import getArrayBuffer :: Response -> Promise ArrayBuffer
foreign import getBlob :: Response -> Promise Blob
foreign import getClone :: Response -> Response
foreign import getFormData :: Response -> Promise FormData
foreign import getJSON :: Response -> Promise (Record String) -- or Array (Record String)
foreign import getText :: Response -> Promise String
