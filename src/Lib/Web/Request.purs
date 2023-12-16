module Lib.Web.Request where

import Prelude

import Control.Promise (Promise)
import Data.Argonaut (Json)
import Data.ArrayBuffer.Types (Uint8Array)
import Data.Map (Map)
import Data.Maybe (Maybe)
import Data.Nullable (Nullable, toMaybe)
import Web.Streams.ReadableStream (ReadableStream)

foreign import data Request :: Type

foreign import getBodyImpl :: Request -> Nullable (ReadableStream Uint8Array)

getBody ∷ Request → Maybe (ReadableStream Uint8Array)
getBody = getBodyImpl >>> toMaybe

foreign import getBodyUsed :: Request -> Boolean

foreign import getCache :: Request -> String

foreign import getCredentials :: Request -> String

foreign import getDestination :: Request -> String

foreign import getHeaders :: Request -> Map String String

foreign import getIntegrity :: Request -> String

foreign import getIsHistoryNavigation :: Request -> Boolean

foreign import getIsReloadNavigation :: Request -> Boolean

foreign import getKeepalive :: Request -> Boolean

foreign import getMethod :: Request -> String

foreign import getMode :: Request -> String

foreign import getRedirect :: Request -> String

foreign import getReferrer :: Request -> String

foreign import getReferrerPolicy :: Request -> String

-- TODO: Deno Type?
-- foreign import getSignal :: Request -> Uint8Array

foreign import getURL :: Request -> String

-- Methods
-- foreign import getBlob :: Request -> Promise Blob

foreign import getClone :: Request -> Promise Request

-- foreign import getFormData :: Request -> Promise FormData

foreign import getJSON :: Request -> Promise Json

foreign import getText :: Request -> Promise String