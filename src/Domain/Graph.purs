module Domain.Graph where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Data.Show.Generic (genericShow)
import Domain.Edge (Edge)
import Domain.Group (Group)
import Domain.Network (Network)
import Domain.Node (Node)

data Graph = Graph
  { id :: String
  , main :: Boolean
  , name :: String
  , nodes :: Array Node
  , edges :: Array Edge
  , groups :: Array Group
  , network :: Network
  , library :: Maybe String
  , description :: Maybe String
  , icon :: Maybe String
  }

derive instance genericGraph :: Generic Graph _
instance showGraph :: Show Graph where
  show = genericShow