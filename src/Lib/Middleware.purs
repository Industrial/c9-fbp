module Lib.Middleware where

import Prelude

import Data.Argonaut (Json, JsonDecodeError, parseJson, stringify)
import Data.Either (Either(..))
import Data.JSDate (now)
import Data.Maybe (Maybe(..))
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

parseStringBody :: Request -> Aff (Maybe String)
parseStringBody request = do
  let requestBody = Request.getBody request
  case requestBody of
    Nothing -> pure Nothing
    Just body -> do
      reader <- liftEffect $ getReader body
      decoder <- liftEffect $ TextDecoder.new utf8
      string <- Stream.toString decoder reader ""
      pure $ Just string

data JSONBodyParseError = NoBody | JsonError JsonDecodeError

parseJSONBody :: Request -> Aff (Either JSONBodyParseError Json)
parseJSONBody request = do
  maybeBody <- parseStringBody request
  case maybeBody of
    Nothing -> pure (Left NoBody)
    Just body -> do
      case parseJson body of
        Left error -> pure (Left (JsonError error))
        Right json -> pure (Right json)

-- TODO: Do we really need this API?
responseBodyJSONSerializer :: Json -> Aff String
responseBodyJSONSerializer json = do
  pure $ stringify json

-- requestMultipartBodyParserMiddleware :: Handler
-- requestCookieParserMiddleware :: Handler
-- responseCORSHeaderSerializerMiddleware :: Handler
-- responseJSONBodySerializerMiddleware :: Handler
