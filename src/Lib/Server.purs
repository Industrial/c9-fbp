module Lib.Server where

import Prelude

import Control.Promise as Promise
import Effect (Effect)
import Effect.Aff (Aff, Error)
import Lib.Web.Request (Request)
import Lib.Web.Response (Response)

foreign import _startServer
  :: (Unit -> Effect (Promise.Promise Unit))
  -> (Error -> Effect (Promise.Promise Response))
  -> (Request -> Effect (Promise.Promise Response))
  -> String
  -> Int
  -> Effect Unit

type ListeningHandler = Unit -> Aff Unit

type ErrorHandler = Error -> Aff Response

type RequestHandler = Request -> Aff Response

startServer
  :: ListeningHandler
  -> ErrorHandler
  -> RequestHandler
  -> String
  -> Int
  -> Effect Unit
startServer handleListening handleError handleRequest hostname port =
  _startServer
    (Promise.fromAff <<< handleListening)
    (Promise.fromAff <<< handleError)
    (Promise.fromAff <<< handleRequest)
    hostname
    port
