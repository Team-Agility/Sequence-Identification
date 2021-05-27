from collections import defaultdict
import heapq
from operator import itemgetter
import wordsUtil

class keywordGraph:
 
    # Constructor
    def __init__(self, iterates=5):
        self.graph = defaultdict(dict)
        self.nodes = {}
        self.iterates = iterates
        self.synonyms = {}
        self.hypernym = {}
 
    # add an edge to graph
    def getNodes(self, maxNodes = -1):
        self.nodes = {}
        nodes = self.graph.keys()

        for i in nodes:
            for j in self.graph[i]:
                if i != j:
                    if i not in self.nodes:
                        self.nodes[i] = self.graph[i][j]
                    else:
                        self.nodes[i] += self.graph[i][j]

        if maxNodes >= 1:
            topTopics = heapq.nlargest(maxNodes, self.nodes.items(), key=itemgetter(1))
            return dict(topTopics)
        return self.nodes

    # add an edge to graph
    def printGraph(self):
        print(dict(self.graph))

    def findSynonym(self, word):
        if word in self.graph:
            return word, False

        if word in self.synonyms:
            return self.synonyms[word], True
            
        synonyms = wordsUtil.getSynonyms(word)
        for synonym in synonyms:
            if synonym in self.graph:
                print('Synonym Matched', word, '=>', synonym)
                self.synonyms[word] = synonym
                return self.synonyms[word], True

        return word, False

    def findHypernym(self, word):
        if word in self.graph:
            return word, False

        if word in self.hypernym:
            return self.hypernym[word], True
            
        for node in self.graph:
            if wordsUtil.isHypernym(word, node):
                print('Hypernym Matched', word, '=>', node)
                self.hypernym[word] = node
                return self.hypernym[word], True

        return word, False

    # add an edge to graph
    def addEdge(self, u, v, weight=1):
        u, uSynonymFound = self.findSynonym(u.lower())
        v, vSynonymFound = self.findSynonym(v.lower())

        # if not uSynonymFound:
        #     u, uHypernymFound = self.findHypernym(u.lower())            
        # if not vSynonymFound:
        #     v, uHypernymFound = self.findHypernym(v.lower())

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

    def isNeighbourNodes(self, u, v):
        if u in self.graph and v in self.graph[u] and self.graph[u][v] > 0:
            return True
        if v in self.graph and u in self.graph[v] and self.graph[v][u] > 0:
            return True
        return False

    # Cluster Simillar words
    def clusterSimiilarWords(self, maxNodes=20):
        for _ in range(self.iterates):
            for i, _ in list(self.getNodes(maxNodes).items()):
                for j in self.getNodes(maxNodes):
                    if i!=j:
                        if self.isNeighbourNodes(i, j):
                            if i in self.graph and j in self.graph[i] and self.graph[i][j] > 2:
                                self.mergeNodes(i, j)

    # Merge 2 Nodes
    def mergeNodes(self, u, v):
        print(f'Merging Nodes "{u}" & "{v}"')
        if u not in self.graph[v] or v not in self.graph[u]:
            return
        del self.graph[u][v]
        del self.graph[v][u]

        for edgeU in self.graph[u]:
            if edgeU in self.graph[v]:
                self.graph[u][edgeU] += self.graph[v][edgeU]
                del self.graph[v][edgeU]

        for edgeV in self.graph[v]:
            self.graph[u][edgeV] = self.graph[v][edgeV]
        del self.graph[v]

        self.graph[f'{u} {v}'] = self.graph[u]
        del self.graph[u]
