module Lib.Middleware where

import Prelude

import Data.Argonaut (Json, JsonDecodeError, parseJson, stringify)
import Data.Either (Either(..))
import Data.JSDate (now)
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Effect.Console as Console
import Lib.Date (differenceInMilliseconds)
import Lib.Server (RequestHandler)
import Lib.Stream as Stream
import Lib.Web.Request (Request)
import Lib.Web.Request as Request
import Web.Encoding.TextDecoder as TextDecoder
import Web.Encoding.UtfLabel (utf8)
import Web.Streams.ReadableStream (getReader)

type Middleware = RequestHandler -> RequestHandler

responseTime :: Middleware
responseTime handler =
  ( \request -> do
      before <- liftEffect now
      response <- handler request
      after <- liftEffect now
      let difference = differenceInMilliseconds after before
      liftEffect $ Console.log $ (show difference) <> "ms"
      pure response
  ) :: RequestHandler

requestBodyParser :: Request -> Aff String
requestBodyParser request = do
  body <- liftEffect $ Request.getBody request
  reader <- liftEffect $ getReader body
  decoder <- liftEffect $ TextDecoder.new utf8
  Stream.toString decoder reader ""

requestBodyJSONParser :: Request -> Aff (Either JsonDecodeError Json)
requestBodyJSONParser request = do
  body <- requestBodyParser request
  let output = parseJson body
  case output of
    Left error -> do
      pure $ Left error
    Right json -> do
      pure $ Right json

-- TODO: Do we really need this API?
responseBodyJSONSerializer :: Json -> Aff String
responseBodyJSONSerializer json = do
  pure $ stringify json

-- requestMultipartBodyParserMiddleware :: Handler
-- requestCookieParserMiddleware :: Handler
-- responseCORSHeaderSerializerMiddleware :: Handler
-- responseJSONBodySerializerMiddleware :: Handler
