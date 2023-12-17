module Controller.Component where

import Prelude

import Data.Argonaut (stringify)
import Data.Either (Either(..))
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect.Class.Console (logShow)
import Lib.Middleware (parseJSONBody, responseTime)
import Lib.Response.Handler (internalServerError)
import Lib.Server (RequestHandler)
import Lib.Web.Response as Response

handleMessage :: RequestHandler
handleMessage r =
  responseTime
    ( \request -> do
        requestBodyE <- parseJSONBody request
        case requestBodyE of
          Left _error -> do
            let
              headers = Map.fromFoldable
                [ Tuple "Content-Type" "application/json"
                ]
            internalServerError headers r
          Right requestBody -> do
            logShow $ stringify requestBody
            let payload = "{ \"orly\": \"yarly\" }"
            let
              headers = Map.fromFoldable
                [ Tuple "Content-Type" "application/json"
                ]
            pure $ Response.create
              payload
              (Just headers)
              (Just 200)
              (Just "OK")
    )
    r
