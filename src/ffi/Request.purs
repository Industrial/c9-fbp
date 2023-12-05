module FFI.Request where

import Control.Promise (Promise)
import Data.Argonaut (Json)
import Data.ArrayBuffer.Types (Uint8Array)
import Data.Map (Map)
import Effect (Effect)
import Web.Streams.ReadableStream (ReadableStream)

foreign import data Request :: Type

foreign import getBody :: Request -> Effect (ReadableStream Uint8Array)

foreign import getBodyUsed :: Request -> Effect Boolean

foreign import getCache :: Request -> Effect String

foreign import getCredentials :: Request -> Effect String

foreign import getDestination :: Request -> Effect String

foreign import getHeaders :: Request -> Effect (Map String String)

foreign import getIntegrity :: Request -> Effect String

foreign import getIsHistoryNavigation :: Request -> Effect Boolean

foreign import getIsReloadNavigation :: Request -> Effect Boolean

foreign import getKeepalive :: Request -> Effect Boolean

foreign import getMethod :: Request -> Effect String

foreign import getMode :: Request -> Effect String

foreign import getRedirect :: Request -> Effect String

foreign import getReferrer :: Request -> Effect String

foreign import getReferrerPolicy :: Request -> Effect String

-- TODO: Deno Type?
-- foreign import getSignal :: Request -> Effect Uint8Array

foreign import getURL :: Request -> Effect String

-- Methods
-- foreign import getBlob :: Request -> Effect (Promise Blob)

foreign import getClone :: Request -> Effect (Promise Request)

-- foreign import getFormData :: Request -> Effect (Promise FormData)

foreign import getJSON :: Request -> Effect (Promise Json)

foreign import getText :: Request -> Effect (Promise String)