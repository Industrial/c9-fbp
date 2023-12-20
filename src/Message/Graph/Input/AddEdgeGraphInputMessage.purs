module Message.Graph.Input.AddEdgeGraphInputMessage where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)
import Message.Common.PortTarget (PortTarget)

type AddEdgeGraphInputMessage =
  { protocol :: String
  , command :: String
  , payload ::
      { graph :: String
      , src :: PortTarget
      , tgt :: PortTarget
      , metadata :: {}
      }
  }

convertAddEdgeGraphInputMessageToJson :: AddEdgeGraphInputMessage -> Json
convertAddEdgeGraphInputMessageToJson = encodeJson

convertAddEdgeGraphInputMessageFromJson :: Json -> Either JsonDecodeError AddEdgeGraphInputMessage
convertAddEdgeGraphInputMessageFromJson = decodeJson
