module Main where

import Prelude

import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff (Aff, Error)
import Effect.Class (liftEffect)
import Effect.Console (log)
import FFI.Server (Request, Response, createResponse, startServer)

affLog :: String -> Aff Unit
affLog = liftEffect <<< log

handleListening :: Unit -> Aff Unit
handleListening = do
  pure $ affLog "Listening"

handleError :: Error -> Aff Response
handleError e = do
  let payload = show e
  let
    headers = Map.fromFoldable
      [ Tuple "Content-Type" "application/json"
      ]
  _ <- affLog $ payload
  pure $ createResponse
    payload
    (Just headers)
    (Just 500)
    (Just "OK")

handleRequest :: Request -> Aff Response
handleRequest _r = do
  let payload = "{ \"orly\": \"yarly\" }"
  let
    headers = Map.fromFoldable
      [ Tuple "Content-Type" "application/json"
      ]
  pure $ createResponse
    payload
    (Just headers)
    (Just 200)
    (Just "OK")

main :: Effect Unit
main = do
  log "Starting ..."
  startServer
    handleListening
    handleError
    handleRequest
    "localhost"
    3000
