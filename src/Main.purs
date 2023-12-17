module Main where

import Prelude

import Controller.Component as Component
import Controller.Graph as Graph
import Controller.Network as Network
import Controller.Runtime as Runtime
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Data.Tuple.Nested (tuple3)
import Effect (Effect)
import Effect.Aff (Aff, Error)
import Effect.Class (liftEffect)
import Effect.Console (log)
import Lib.Application (Application, handleRequest)
import Lib.Server (startServer)
import Lib.Web.Response (Response)
import Lib.Web.Response as Response

affLog :: String -> Aff Unit
affLog = liftEffect <<< log

handleListening :: String -> Int -> (Unit -> Aff Unit)
handleListening hostname port = do
  let message = "Listening on http://" <> hostname <> ":" <> (show port)
  pure $ affLog message

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
  [ tuple3 "GET" "/component" Component.handleMessage
  , tuple3 "GET" "/graph" Graph.handleMessage
  , tuple3 "GET" "/network" Network.handleMessage
  , tuple3 "GET" "/runtime" Runtime.handleMessage
  ]

main :: Effect Unit
main = do
  let hostname = "localhost"
  let port = 3000
  log "Starting ..."
  startServer
    (handleListening hostname port)
    handleError
    (handleRequest application)
    hostname
    port
