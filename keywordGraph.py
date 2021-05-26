from collections import defaultdict
import heapq
from operator import itemgetter

class keywordGraph:
 
    # Constructor
    def __init__(self):
        self.graph = defaultdict(dict)
        self.nodes = {}
 
    # add an edge to graph
    def getNodes(self, maxNodes = -1):
        if maxNodes >= 1:
            topTopics = heapq.nlargest(maxNodes, self.nodes.items(), key=itemgetter(1))
            return dict(topTopics)
        return self.nodes

    # add an edge to graph
    def printGraph(self):
        print(dict(self.graph))

    # add an edge to graph
    def addEdge(self, u, v, weight=1):
        if u not in self.nodes:
            self.nodes[u] = weight
        else:
            self.nodes[u] += weight     
        if v not in self.nodes:
            self.nodes[v] = weight
        else:
            self.nodes[v] += weight

        self.graph[u][v] = weight
        self.graph[v][u] = weight

    # get weight of an edge
    def getEdgeWeight(self, u, v):
        if u not in self.graph or v not in self.graph[u]:
            return 0
        weight = self.graph[u][v]
        return weight if weight else 0

    # increment weight in an edge
    def incrementEdgeWeight(self, u, v, weight):
        current_weight = self.getEdgeWeight(u, v)
        self.addEdge(u, v, current_weight + weight)