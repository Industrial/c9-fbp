module Lib.Application where

import Prelude

import Data.Array as Array
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect.Class (liftEffect)
import Lib.Endpoint (Endpoint)
import Lib.Endpoint as Endpoint
import Lib.Response.Handler as ResponseHandler
import Lib.Route as Route
import Lib.Server (RequestHandler)
import Lib.Web.Request as Request
import Lib.Web.URL (URL)
import Lib.Web.URL as URL

type Application = Array Endpoint

handleRequest :: Application -> RequestHandler
handleRequest app request = do
  method <- liftEffect $ Request.getMethod request
  urlString <- liftEffect $ Request.getURL request
  let url = URL.create urlString
  let maybeMatchingEndpoint = findMatchingEndpoint app method url
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

findMatchingEndpoint :: Application -> String -> URL -> Maybe Endpoint
findMatchingEndpoint app method url =
  Array.find findEndpoint app
  where
  findEndpoint :: Endpoint -> Boolean
  findEndpoint endpoint =
    let
      endpointMethod = Endpoint.getMethod endpoint
      endpointRoute = Endpoint.getRoute endpoint
    in
      endpointMethod == method && Route.matchesURL endpointRoute url
