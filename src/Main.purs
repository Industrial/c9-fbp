module Main where

import Prelude

import Controller.Component as Component
import Controller.Graph as Graph
import Controller.Network as Network
import Controller.Runtime as Runtime
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested (tuple3)
import Effect (Effect)
import Effect.Aff (Aff, Error)
import Effect.Console (log)
import Lib.Aff (affLog)
import Lib.Application (Application, handleRequest)
import Lib.Server (startServer)
import Lib.Web.Response (Response)
import Lib.Web.Response as Response

handleListening :: String -> Int -> (Unit -> Aff Unit)
handleListening hostname port = do
  let message = "Listening on http://" <> hostname <> ":" <> (show port)
  pure $ affLog message

handleError :: Error -> Aff Response
handleError e = do
  pure $ Response.create
    (show e)
    Nothing
    (Just 500)
    (Just "OK")

application :: Application
application =
  [ tuple3 "POST" "/component" Component.handleMessage
  , tuple3 "POST" "/graph" Graph.handleMessage
  , tuple3 "POST" "/network" Network.handleMessage
  , tuple3 "POST" "/runtime" Runtime.handleMessage
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
