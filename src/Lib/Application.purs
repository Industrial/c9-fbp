module Lib.Application where

import Prelude

import Data.Array as Array
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect.Class (liftEffect)
import Lib.Endpoint (Endpoint)
import Lib.Endpoint as Endpoint
import Lib.Request as Request
import Lib.Response.Handler as ResponseHandler
import Lib.Route (matchesURL)
import Lib.Server (RequestHandler)
import Lib.String (stripTrailingSlash)

type Application = Array Endpoint

handleRequest :: Application -> RequestHandler
handleRequest app request = do
  method <- liftEffect $ Request.getMethod request
  url <- liftEffect $ Request.getURL request
  let maybeMatchingEndpoint = findMatchingEndpoint method url app
  case maybeMatchingEndpoint of
    Just endpoint -> do
      let handler = Endpoint.getHandler endpoint
      handler request
    _ -> do
      let
        headers = Map.fromFoldable
          [ Tuple "Content-Type" "application/json"
          ]
      ResponseHandler.notFound headers request

findMatchingEndpoint :: String -> String -> Application -> Maybe Endpoint
findMatchingEndpoint method url app =
  Array.find
    ( \endpoint ->
        let
          endpointMethod = Endpoint.getMethod endpoint
          endpointRoute = Endpoint.getRoute endpoint
          strippedURL = stripTrailingSlash url
        in
          endpointMethod == method && matchesURL endpointRoute strippedURL
    )
    app
