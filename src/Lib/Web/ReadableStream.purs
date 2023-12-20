module Lib.Web.ReadableStream where

import Prelude

import Data.Lens (re)
import Data.Maybe (Maybe)
import Data.Nullable (Nullable(..))
import Effect (Effect)
import Effect.Aff (Aff)
import Lib.Web (AbortSignal, PipeOptions, ReadableStream, ReadableStreamDefaultControllerCallback, ReadableStreamDefaultReader, ReadableStreamErrorCallback, Uint8Array, WritableStream)
import Promise (Promise)
import Promise.Aff (toAff)

-- Properties
foreign import getLocked :: ReadableStream Uint8Array -> Boolean

-- Methods
foreign import create :: ReadableStreamDefaultControllerCallback Uint8Array -> ReadableStreamErrorCallback -> (ReadableStreamDefaultControllerCallback Uint8Array) -> (ReadableStream Uint8Array)

foreign import cancelImpl :: ReadableStream Uint8Array -> Maybe String -> Promise (ReadableStream Uint8Array)

cancel :: ReadableStream Uint8Array -> Maybe String -> Aff (ReadableStream Uint8Array)
cancel stream reason = toAff $ cancelImpl stream reason

-- foreign import getReader :: ReadableStream Uint8Array -> ReadableStreamDefaultReader Uint8Array

-- foreign import pipeThrough
--   :: ReadableStream Uint8Array
--   -> { writable :: WritableStream Uint8Array, readable :: ReadableStream Uint8Array }
--   -> { preventAbort :: Boolean, preventCancel :: Boolean, preventClose :: Boolean, signal :: Maybe AbortSignal }
--   -> ReadableStream Uint8Array

-- foreign import pipeTo
--   :: ReadableStream Uint8Array
--   -> WritableStream Uint8Array
--   -> Nullable PipeOptions
--   -> Promise Unit

-- foreign import tee :: forall a. ReadableStream a -> Effect (Tuple (ReadableStream a) (ReadableStream a))

-- foreign import isReadableStreamLocked :: forall a. ReadableStream a -> Effect Boolean
