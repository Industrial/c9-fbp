module Main where

import Prelude

import Controller.Message as Message
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
  [ tuple3 "POST" "/" Message.handleMessage
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
