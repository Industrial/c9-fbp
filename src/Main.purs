module Main where

import Prelude

import Controller.Message (handleMessage)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Data.Tuple.Nested (tuple3)
import Effect (Effect)
import Effect.Aff (Aff, Error)
import Effect.Class (liftEffect)
import Effect.Console (log)
import Lib.Application (Application, handleRequest)
import Lib.Web.Response (Response)
import Lib.Web.Response as Response
import Lib.Server (startServer)

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
  pure $ Response.create
    payload
    (Just headers)
    (Just 500)
    (Just "OK")

application :: Application
application =
  [ tuple3 "GET" "/" handleMessage
  ]

main :: Effect Unit
main = do
  log "Starting ..."
  startServer
    handleListening
    handleError
    (handleRequest application)
    "localhost"
    3000
