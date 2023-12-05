module Lib.Stream where

import Prelude

import Data.ArrayBuffer.Types (Uint8Array)
import Data.Maybe (Maybe(..))
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Promise.Aff as Promise.Aff
import Web.Encoding.TextDecoder as TextDecoder
import Web.Streams.Reader (Reader, read)

toString
  :: forall (chunk :: Uint8Array)
   . TextDecoder.TextDecoder
  -> Reader Uint8Array
  -> String
  -> Aff String
toString decoder reader buffer = do
  promise <- liftEffect $ read reader
  chunkAff <- Promise.Aff.toAff promise
  case chunkAff of
    Just chunk -> do
      chunkString <- liftEffect $ TextDecoder.decode chunk decoder
      toString decoder reader (buffer <> chunkString)
    _ ->
      pure buffer
