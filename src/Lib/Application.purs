module Lib.Application where

import Prelude

import Data.Maybe (Maybe)
import Effect (Effect)
import Effect.Aff (Aff, launchAff_)
import FFI.Server (Request, Response)
import Lib.Endpoint (Endpoint)
import Web.Streams.ReadableStream (ReadableStream)

type Application = Array Endpoint

parseRequestBody :: ReadableStream -> Aff String
parseRequestBody requestStream = do
  buffer <- toBuffer requestStream
  liftEffect $ Buffer.toString UTF8 buffer

handleRequest :: Application -> Request -> Response -> Effect Unit
handleRequest app request response = do
  launchAff_ do
    let method = HTTPRequest.requestMethod request
    let url = HTTP.requestURL request
    let matchingEndpoint = findMatchingEndpoint method url app
    case matchingEndpoint of
      Just endpoint -> do
        let handler = getHandler endpoint
        handler request response
      _ -> do
        HTTPResponse.notFound request response

findMatchingEndpoint :: String -> String -> Application -> Maybe Endpoint
findMatchingEndpoint method url app =
  Array.find
    ( \endpoint ->
        let
          endpointMethod = getMethod endpoint
          endpointRoute = getRoute endpoint
          strippedURL = stripTrailingSlash url
        in
          endpointMethod == method && matchesURL endpointRoute strippedURL
    )
    app
