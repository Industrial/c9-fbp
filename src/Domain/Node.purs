module Domain.Node where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Domain.Port (Port)

data Node = Node
  { id :: String
  , name :: String
  , inPorts :: Array Port
  , outPorts :: Array Port
  }

derive instance genericNode :: Generic Node _
instance showNode :: Show Node where
  show = genericShow