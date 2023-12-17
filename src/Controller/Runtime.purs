module Controller.Runtime where

import Prelude

import Data.Argonaut (printJsonDecodeError, stringify)
import Data.Either (Either(..))
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect.Class.Console (logShow)
import Lib.Middleware (JSONBodyParseError(..), parseJSONBody, responseTime)
import Lib.Server (RequestHandler)
import Lib.Web.Response as Response

handleMessage :: RequestHandler
handleMessage r =
  responseTime
    ( \request -> do
        requestBodyE <- parseJSONBody request
        case requestBodyE of
          Left e -> do
            let
              headers = Map.fromFoldable
                [ Tuple "Content-Type" "application/json"
                ]
            case e of
              NoBody -> do
                let payload = "{ \"error\": \"No Body\" }"
                pure $ Response.create
                  payload
                  (Just headers)
                  (Just 500)
                  (Just "OK")
              JsonError err -> do
                let payload = "{ \"error\": \"" <> printJsonDecodeError err <> "\" }"
                pure $ Response.create
                  payload
                  (Just headers)
                  (Just 500)
                  (Just "OK")
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
