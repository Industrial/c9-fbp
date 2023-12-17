module Controller.Component where

import Prelude

import Data.Argonaut (stringify)
import Data.Either (Either(..))
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Effect.Class.Console (logShow)
import Lib.Middleware (parseJSONBody, responseTime)
import Lib.Response.Handler (internalServerError, jsonContentTypeHeader, ok)
import Lib.Server (RequestHandler)
import Lib.Web.Response as Response

getsource :: RequestHandler
getsource request = do
  requestBodyE <- parseJSONBody request
  case requestBodyE of
    Left _error -> internalServerError Nothing request
    Right _requestBody -> do
      let
        headers = Map.fromFoldable
          [ jsonContentTypeHeader
          ]
      let payload = "{ \"orly\": \"yarly\" }"
      ok payload (Just headers) request

handleMessage :: RequestHandler
handleMessage r =
  responseTime
    ( \request -> do
        requestBodyE <- parseJSONBody request
        case requestBodyE of
          Left _error -> internalServerError Nothing r
          Right requestBody -> do
            logShow $ stringify requestBody
            let payload = "{ \"orly\": \"yarly\" }"
            let
              headers = Map.fromFoldable
                [ jsonContentTypeHeader
                ]
            pure $ Response.create
              payload
              (Just headers)
              (Just 200)
              (Just "OK")
    )
    r
