module Domain.Message where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)

type Message =
  { protocol :: String
  , command :: String
  , payload :: {}
  }

messageToJson :: Message -> Json
messageToJson = encodeJson

messageFromJson :: Json -> Either JsonDecodeError Message
messageFromJson = decodeJson
