module Lib.Web.Request where

import Prelude

import Control.Promise (Promise)
import Data.Argonaut (Json)
import Data.ArrayBuffer.Types (Uint8Array)
import Data.Maybe (Maybe)
import Data.Nullable (Nullable, toMaybe)
import Effect (Effect)
import Lib.Headers (Headers)
import Lib.Web (AbortSignal, Blob, FormData, ReferrerPolicy, Request, RequestCache, RequestCredentials, RequestDestination, RequestInit, RequestMode, RequestRedirect)
import Web.Streams.ReadableStream (ReadableStream)

-- Properties
foreign import getBodyImpl :: Request -> Nullable (ReadableStream Uint8Array)

getBody ∷ Request → Maybe (ReadableStream Uint8Array)
getBody = getBodyImpl >>> toMaybe

foreign import getBodyUsed :: Request -> Boolean
foreign import getCache :: Request -> RequestCache
foreign import getCredentials :: Request -> RequestCredentials
foreign import getDestination :: Request -> RequestDestination
foreign import getHeaders :: Request -> Headers
foreign import getIntegrity :: Request -> String
foreign import getIsHistoryNavigation :: Request -> Boolean
foreign import getIsReloadNavigation :: Request -> Boolean
foreign import getKeepalive :: Request -> Boolean
foreign import getMethod :: Request -> String
foreign import getMode :: Request -> RequestMode
foreign import getRedirect :: Request -> RequestRedirect
foreign import getReferrer :: Request -> String
foreign import getReferrerPolicy :: Request -> ReferrerPolicy
foreign import getSignal :: Request -> AbortSignal
foreign import getURL :: Request -> String

-- Functions
foreign import create :: String -> RequestInit -> Request
-- Create unit tests for the create function:

foreign import getBlob :: Request -> Effect (Promise Blob)
foreign import getClone :: Request -> Effect Request
foreign import getFormData :: Request -> Effect (Promise FormData)
foreign import getJSON :: Request -> Effect (Promise Json)
foreign import getText :: Request -> Effect (Promise String)