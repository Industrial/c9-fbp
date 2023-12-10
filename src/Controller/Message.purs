module Controller.Message where

import Prelude

import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect.Class.Console (logShow)
import Lib.Web.Response as Response
import Lib.Server (RequestHandler)

handleMessage :: RequestHandler
handleMessage _r = do
  logShow "handleMessage"
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