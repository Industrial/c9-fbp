module Message.Component.Output.ComponentsReadyComponentOutputMessage where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)

type ComponentsReadyComponentOutputMessage =
  { protocol :: String
  , command :: String
  , payload :: {}
  }

convertComponentsReadyComponentOutputMessageToJson :: ComponentsReadyComponentOutputMessage -> Json
convertComponentsReadyComponentOutputMessageToJson = encodeJson

convertComponentsReadyComponentOutputMessageFromJson :: Json -> Either JsonDecodeError ComponentsReadyComponentOutputMessage
convertComponentsReadyComponentOutputMessageFromJson = decodeJson
