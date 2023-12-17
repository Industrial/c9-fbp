module Domain.Edge where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Domain.Metadata (Metadata)
import Domain.PortTarget (PortTarget)

data Edge = Edge
  { source :: PortTarget
  , target :: PortTarget
  , metadata :: Metadata
  }

derive instance genericEdge :: Generic Edge _
instance showEdge :: Show Edge where
  show = genericShow